
using Dto;


namespace Services
{
    public interface IPasswordService
    {
        int getStrengthByPassword(string p);
        string HashPassword(string password);
        bool VerifyPassword(string password, string passwordHash);
    }
}