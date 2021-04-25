using System;
using Api_work.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;
using Dapper;

namespace Api_work.Service.Repository
{
    public interface ISaleRepository
    {
        Task<PageDate<SaleView>> GetList(PagesParams paramers);
    }

    public class SaleRepository : ISaleRepository
    {
        private string _connectStr;

        public SaleRepository(string connect)
        {
            _connectStr = connect;
        }

        public  async Task<PageDate<SaleView>> GetList(PagesParams paramers)
        {
            var sql = @"SELECT s.Id,
                        s.Datebuy as DateBuy,
                        s.Count,
                        s.Summ,
                        c.Name as ClientName,
                        sf.Name as SoftName,
                        sf.Price as PriceOne
                    FROM sales s
                    join clients c on c.Id = s.Id_client
                    join softs sf on sf.Id = s.Id_soft
                    order by s.Id
                    LIMIT  @getCount
                    OFFSET @skipCount;";

            var skipCount = (paramers.PageNumber -1) * paramers.PageSize;
            List<SaleView> sales = new List<SaleView>();

            using(var bd = new SqliteConnection(_connectStr))
            {
                sales = (await bd.QueryAsync<SaleView>(sql, 
                new{
                    skipCount = skipCount,
                    getCount = paramers.PageSize
                })).AsList();
            }

            int count;
            sql = "select count(*) from sales";
            using(var bd = new SqliteConnection(_connectStr))
            {
                count = await bd.QueryFirstAsync<int>(sql);
            }

            return new PageDate<SaleView>()
            {
                CurrentPage = paramers.PageNumber,
                Items = sales,
                PageSize = paramers.PageSize,
                CountPage = (int)Math.Ceiling( count / (double) paramers.PageSize )
            };
        }
    }
}