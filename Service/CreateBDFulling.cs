using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.Sqlite;
using Dapper;
using Api_work.Models;
using System.Collections.Generic;

namespace Api_work
{
    public static class CreateBDFulling
    {
        public static void Full()
        {
            var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json");
            var appConfiguration = builder.Build();
            string con = appConfiguration["ConnectionStrings:SaleDatabase"];


            var sqlTables = @"CREATE TABLE IF NOT EXISTS clients (
                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                Name TEXT NOT NULL,
                Mark INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS softs (
                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                Name TEXT NOT NULL,
                Description TEXT NOT NULL,
                Price TEXT NOT NULL,
                Count INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS sales (
                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                Datebuy TEXT NOT NULL,
                Id_client INTEGER NOT NULL,
                Id_soft INTEGER NOT NULL,
                Count INTEGER NOT NULL,
                Summ TEXT NOT NULL
            );";

            using(var bd = new SqliteConnection(con))
            {
                bd.Execute(sqlTables);
            }

            int countClient = 0;
            int countSoft = 0;
            int countSale = 0;

            var softs = new List<Soft>()
            {
                new Soft() {Id = 0, Name = "Windows", Description = "Os", Price = 2500.0M, Count = 10},
                new Soft() {Id = 1, Name = "Visual Studio", Description = "IDE", Price = 1000.0M, Count = 10},
                new Soft() {Id = 2, Name = "Chrome ", Description = "Browser", Price = 1500.0M, Count = 5},
            };
            var sqlCountSoft = "Select count(*) from softs";

            using(var bd = new SqliteConnection(con))
            {
                countSoft = bd.QueryFirst<int>(sqlCountSoft);
            }

            if(countSoft == 0)
            {
                var sqlInsertSofts = "INSERT INTO softs (Id, Name, Description, Price, Count) VALUES (@id, @name, @description, @price, @count);";
                foreach(var soft in softs)
                {
                    using(var bd = new SqliteConnection(con))
                    {
                        bd.Execute(sqlInsertSofts, new { id = soft.Id, name = soft.Name, description = soft.Description, price = soft.Price, count = soft.Count } );
                    }
                }
            }

            var clients = new List<Client>()
            {
                new Client(){ Id = 0, Name = "Иван",    Mark = 5 },
                new Client(){ Id = 1, Name = "Андрей",  Mark = 5 },
                new Client(){ Id = 2, Name = "Николай", Mark = 5 }
            };
            var sqlCountClient = "Select count(*) from clients";
            
            using(var bd = new SqliteConnection(con))
            {
                countClient  = bd.QueryFirst<int>(sqlCountClient);
            }

            if(countClient == 0)
            {
                var sqlInsertClient = "INSERT INTO clients (Id, Name, Mark ) VALUES (@id, @name, @mark);";

                foreach(var client in clients)
                {
                    using(var bd = new SqliteConnection(con))
                    {
                        bd.Execute(sqlInsertClient, new { id = client.Id, name = client.Name, mark = client.Mark } );
                    }
                }
            }

            var sales = new List<Sale>()
            {
                new Sale(){ Id = 0, Datebuy = DateTime.Now, Id_client = 0, Id_soft = 0, Count = 1, Summ = 0.0M },
                new Sale(){ Id = 1, Datebuy = DateTime.Now, Id_client = 1, Id_soft = 1, Count = 1, Summ = 0.0M },
                new Sale(){ Id = 2, Datebuy = DateTime.Now, Id_client = 2, Id_soft = 2, Count = 1, Summ = 0.0M },
            };

            var sqlCountSales = "Select count(*) from sales";

            using(var bd = new SqliteConnection(con))
            {
                countSale = bd.QueryFirst<int>(sqlCountSales);
            }


            if(countSale == 0)
            {
                var sqlInsertSale = @"INSERT INTO sales ( id, datebuy, id_client, id_soft, count, summ) VALUES (@id, @datebuy, @id_client, @id_soft, @count, @summ)";

                foreach(var sale in sales)
                {
                    using(var bd = new SqliteConnection(con))
                    {
                         bd.Execute(sqlInsertSale, new { id = sale.Id, datebuy = sale.Datebuy, id_client = sale.Id_client,  id_soft = sale.Id_soft, count = sale.Count, summ = sale.Summ } );
                    }
                }
            }


        }
    }
}
