using System;
namespace Api_work.Models
{
    public class SaleView
    {
        public int Id {get; set;}

        public string SoftName {get; set;}

        public decimal PriceOne {get; set;}

        public int Count {get; set;}

        public decimal Summ {get; set;}

        public string ClientName {get; set;}
        public DateTime DateBuy  {get; set;}

        public string DateBuyStr
        {
            get 
            {
                return DateBuy.ToString("dd.MM.yyyy");
            }
        }
    }
}