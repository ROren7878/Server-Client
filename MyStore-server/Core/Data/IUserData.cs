using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Data
{
    public interface IUserData
    {
        IEnumerable<User> GetAll();
        User GetById(int id);
        User GetByUserNameEmail(string userName, string email);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user, int id);
        //Task UpdateUserNamePasswordAsync(int id, string userName, string password);
        Task DeleteUserAsync(int id);
    }
}
