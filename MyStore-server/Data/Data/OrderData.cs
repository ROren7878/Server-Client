using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core;
using Core.Data;
using Core.DTO;
using Microsoft.EntityFrameworkCore;

namespace Data.Data
{
    public class OrderData : IOrderData
    {
        public readonly DataContext dataContext;
        public OrderData(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }


        public IEnumerable<Order> GetAll()
        {
            return dataContext.orders.Include(o => o.User);
        }
        public Order GetById(int id)
        {
            return dataContext.orders.Include(o => o.User).FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Order> GetByUserId(int userId)
        {
            return dataContext.orders.Include(o => o.User).Where(o => o.UserId == userId);
        }

        public IEnumerable<Order> GetByDate(DateTime date)
        {
            return dataContext.orders.Include(o => o.User).Where(o => o.OrderDate.Date == date.Date).ToList();
        }

        public async Task AddOrderAsync(Order order)
        {
            User user = dataContext.users.FirstOrDefault(u => u.Id == order.Id);
            order.User = user;

            //dataContext.Attach(order.User);
            //order.User = null;
            dataContext.orders.Add(order);
            await dataContext.SaveChangesAsync();
        }

    }
}
