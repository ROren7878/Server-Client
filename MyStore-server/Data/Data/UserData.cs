using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core;
using Core.Data;

namespace Data.Data
{
    public class UserData : IUserData
    {
        public readonly DataContext dataContext;

        public UserData(DataContext _dataContext)
        {
            dataContext = _dataContext;
        }

        public IEnumerable<User> GetAll()
        {
            return dataContext.users.ToList();
        }

        public User GetById(int id)
        {
            return dataContext.users.FirstOrDefault(x => x.Id == id);
        }

        public User GetByUserNameEmail(string userName, string email)
        {
            return dataContext.users.FirstOrDefault(x => x.UserName == userName &&  x.Email == email);
        }

        public async Task UpdateUserAsync(User user, int id)
        {
            User u = dataContext.users.FirstOrDefault(x => x.Id == id);
            if (u != null)
            {
                u.Id = user.Id;
                if (u.UserName != user.UserName)
                    u.UserName = user.UserName;

                if (u.City != user.City)
                    u.City = user.City;

                if (u.street != user.street)
                    u.street = user.street;

                if (u.house != user.house)
                    u.house = user.house;

                if (u.Email != user.Email)
                    u.Email = user.Email;

                if (u.Phone != user.Phone)
                    u.Phone = user.Phone;
            }
            await dataContext.SaveChangesAsync();
        }

        public async Task AddUserAsync(User user)
        {

            dataContext.users.Add(user);
            
            await dataContext.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(int id)
        {
            User user = dataContext.users.FirstOrDefault(u => u.Id == id);
            if (user != null)
            {
                dataContext.users.Remove(user);
            }
            await dataContext.SaveChangesAsync();
        }
    }
}
