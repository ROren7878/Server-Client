using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DTO;

namespace Core
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string Desc { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public string Src { get; set; }
        public int? CategoryId { get; set; }
        public int? SubCategoryId { get; set; }
        public int? CompanyId { get; set; }

        public Category Category { get; set; }
        public SubCategory SubCategory { get; set; }
        public Company Company { get; set; }
    }
}
