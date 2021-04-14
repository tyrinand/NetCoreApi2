using System;
using Api_work.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Data.Sqlite;
using Dapper;

namespace Api_work.Service.Repository
{
    public interface IClientRepository
    {
        Task<bool> Create(Client client);
        
        Task<bool> Delete(int Id);

        Task<List<Client>> GetList();

        Task<Client> GetClient(int id);

        Task<bool> Update(Client client);
    }

    public class ClientRepository : IClientRepository
    {
        private string _connectStr;

        public ClientRepository(string connect)
        {
            _connectStr = connect;
        }

        public async Task<List<Client>> GetList()
        {
            var sql = @"Select Id, Name, Mark from clients";
            using(var bd = new SqliteConnection(_connectStr))
            {
               return (await bd.QueryAsync<Client>(sql)).AsList();
            }
        }

        public async Task<bool> Create(Client client)
        {
            var sql = "insert into clients (Name, Mark) values (@Name, @Mark)";
            using(var bd = new SqliteConnection(_connectStr))
            {
                return (await bd.ExecuteAsync(sql, client)) != 0;
            }
        }

        public async Task<bool> Delete(int id)
        {
            var sql =  "delete from clients where Id = @id";
            using(var bd = new SqliteConnection(_connectStr))
            {
                return (await bd.ExecuteAsync(sql, new{ id = id } )) != 0;
            }
        }

        public async Task<Client> GetClient(int id)
        {
            var sql =  "Select Id, Name, Mark from clients where Id = @id";
            using(var bd = new SqliteConnection(_connectStr))
            {
                return await bd.QueryFirstAsync<Client>(sql, new{ id = id } );
            }
        }

        public async Task<bool> Update(Client client)
        {
            var sql = @"update clients SET Name = @Name , Mark = @Mark where Id = @Id";
            using(var bd = new SqliteConnection(_connectStr))
            {
                return (await bd.ExecuteAsync(sql, client)) != 0;
            }
        }
    }
}