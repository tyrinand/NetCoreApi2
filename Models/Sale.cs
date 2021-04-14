using System;

namespace Api_work.Models
{
    public class Sale
    {
        public int Id {get; set;}

        public DateTime Datebuy {get; set;}

        public int Id_client {get; set;}

        public int Id_soft {get; set;}

        public int Count {get; set;}

        public decimal Summ {get; set;}
    }
}