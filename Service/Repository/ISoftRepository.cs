using System;
using Api_work.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;
using Dapper;

namespace Api_work.Service.Repository
{
    public interface ISoftRepository
    {
        Task<PageDate<Soft>> GetList(PagesParams paramers);
    }
    
    public class SoftRepository : ISoftRepository
    {
    
        private string _connectStr;

        public SoftRepository(string connect)
        {
            _connectStr = connect;
        }

        public async Task<PageDate<Soft>> GetList(PagesParams paramers)
        {
                var sql = @"SELECT Id,
                            Name,
                            Description,
                            Price,
                            Count
                        FROM softs
                        order by Id
                        LIMIT @getCount
                        OFFSET @skipCount;
                        ";

            var skipCount = (paramers.PageNumber - 1) * paramers.PageSize;
            List<Soft> softs = new List<Soft>();

            using(var bd = new SqliteConnection(_connectStr))
            {
                softs = (await bd.QueryAsync<Soft>(
                    sql, new {
                        skipCount = skipCount,
                        getCount = paramers.PageSize
                    }
                )).AsList();

            }

            int count;
            sql = @"select count(*) from softs";
            using(var bd = new SqliteConnection(_connectStr))
            {
                count = bd.QueryFirst<int>(sql);
            }

            return new PageDate<Soft>()
            {
                CurrentPage = paramers.PageNumber,
                Items = softs,
                PageSize = paramers.PageSize,
                CountPage = (int)Math.Ceiling( count / (double) paramers.PageSize )
            };
        }

    }

    
}