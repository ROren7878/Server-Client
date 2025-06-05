using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTO
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string Desc { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public string Src { get; set; }
        public int? CompanyId { get; set; }
        public string? CompanyName { get; set; }

        public int? CategoryId { get; set; }
        public string? CategoryName { get; set; }

        public int? SubCategoryId { get; set; }
        public string? SubCategoryName { get; set; }
    }
}
