using Repository.Models;

namespace Repository
{
    public interface IUserRepository
    {
        Task<User> AddNewUser(User user);
        Task<User?> GetUserById(int id);
        Task<List<User>> GetUsers();
        Task<User?> GetUserByEmail(string email);
        Task<User> update(int id, User value);
        Task<User> GetUserByIdAndPassword(int id, string password);
    }
}