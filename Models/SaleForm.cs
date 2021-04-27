using System;
using System.Collections.Generic;


namespace Api_work.Models
{
    public class SaleForm
    {
        public Sale sale {get ;set;}

        public List<Client> clients {get; set;}

        public List<Soft> softs {get; set;}
    }
}