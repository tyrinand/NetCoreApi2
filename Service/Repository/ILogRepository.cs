using System;
using Api_work.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;
using Dapper;
using System.Text.RegularExpressions;

namespace Api_work.Service.Repository
{
    public interface ILogRepository
    {
        Task<PageDate<LogRow>> GetList(PagesParams paramers);
    }

    public class LogRepository : ILogRepository
    {
        private string _connectStr;

        public LogRepository(string connect)
        {
            _connectStr = connect;
        }

        public async Task<PageDate<LogRow>> GetList(PagesParams paramers)
        {
            var sql = @"";

            if(paramers.Filter == "All")
            {
                sql = @"SELECT Id,
                        DateTime,
                        Level,
                        Message,
                        StackTrace
                    FROM Logs
                    order by Id desc
                    LIMIT @getCount
                    OFFSET @skipCount;";
            }
            else
            {
                sql = @"SELECT Id,
                        DateTime,
                        Level,
                        Message,
                        StackTrace
                    FROM Logs
                    where Level = @level
                    order by Id desc
                    LIMIT @getCount
                    OFFSET @skipCount;";
            }

            var skipCount = (paramers.PageNumber - 1) * paramers.PageSize;
            List<LogRow> logs = new List<LogRow>();

            using(var bd = new SqliteConnection(_connectStr))
            {
               logs = (await bd.QueryAsync<LogRow>(sql, 
                    new { 
                        skipCount = skipCount,
                        getCount = paramers.PageSize,
                        level = paramers.Filter
                    }
                    )).AsList();
            }

            int count;

            if(paramers.Filter == "All")
            {
                sql = @"select count(*) from Logs";
            }
            else
            {
                sql = @"select count(*) from Logs where Level = @level";
            }
            

            using(var bd = new SqliteConnection(_connectStr))
            {
                count = await bd.QueryFirstAsync<int>(sql, new {  level = paramers.Filter });
            }

            return new PageDate<LogRow>() 
            {
                CurrentPage = paramers.PageNumber,
                Items = logs,
                PageSize = paramers.PageSize,
                CountPage = (int)Math.Ceiling( count / (double) paramers.PageSize )
            };

        }
    }

   
}