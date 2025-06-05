using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core;
using Core.Data;
using Core.Service;
//using Microsoft.AspNetCore.Mvc;

namespace Service
{
    public class OrderService : IOrderService
    {
        private readonly IOrderData orderData;

        public OrderService(IOrderData _orderData)
        {
            orderData = _orderData;
        }
        public IEnumerable<Order> GetAll()
        {
            return  orderData.GetAll();
        }

        public IEnumerable<Order> GetByDate(DateTime date)
        {
            return orderData.GetByDate(date);
        }

        public Order GetById(int id)
        {
            return orderData.GetById(id);
        }

        public IEnumerable<Order> GetByUserId(int userId)
        {
            return orderData.GetByUserId(userId);
        }
        public async Task AddOrderAsync(Order order)
        {
            await orderData.AddOrderAsync(order);
        }
    }
}
