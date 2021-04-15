using System;
using System.Collections.Generic;

namespace Api_work.Models
{
    public class PageDate<T>
    {
        public int CurrentPage {get ;set;}

        public int CountPage {get ;set;}

        public int PageSize {get ;set ;}

        public List<T> Items {get ;set;}
    }
}