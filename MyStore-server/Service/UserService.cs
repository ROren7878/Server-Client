using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core;
using Core.Data;
using Core.Service;


namespace Service
{
    public class UserService : IUserService
    {
        public readonly IUserData userData;

        public UserService(IUserData _userData)
        {
            userData = _userData;
        }

        public IEnumerable<User> GetAll()
        {
            return userData.GetAll();
        }

        public User GetById(int id)
        {
            return userData.GetById(id);
        }

        public User GetByUserNameEmail(string userName, string email)
        {
            return userData.GetByUserNameEmail(userName, email);
        }

        public async Task UpdateUserAsync(User user, int id)
        {
            await userData.UpdateUserAsync(user, id);
        }
        public async Task AddUserAsync(User user)
        {
            await userData.AddUserAsync((User)user);
        }

        public async Task DeleteUserAsync(int id)
        {
            await userData.DeleteUserAsync(id);
        }
    }
}
