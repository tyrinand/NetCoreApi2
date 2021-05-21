using System;

namespace Api_work.Models
{
    public class LogRow
    {
        public int Id {get ;set;}
        public DateTime DateTime {get; set;}

        public string Level {get ;set; }

        public string Message {get ;set;}

        public string StackTrace {get ;set;}
       
       
        public string TimeStampStr
        {
            get 
            {
                return DateTime.ToString("dd.MM.yyyy HH:mm:ss");
            }
        }
    }
}