using System;

namespace Api_work.Models
{
    /// <summary>
    /// класс входных параметров 
    /// </summary>
    public class PagesParams
    {
        const int maxPageSize = 50;

        public int PageNumber {get ; set;} = 1;

        private int _pageSize = 2;

        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }

    }
}