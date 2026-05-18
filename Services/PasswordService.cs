using AutoMapper;
using BCrypt.Net;
using Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class PasswordService : IPasswordService
    {
        IMapper mapper;
        public PasswordService(IMapper mapperr)
        {
            mapper = mapperr;
        }

        public int getStrengthByPassword(string p)
        {
            var result = Zxcvbn.Core.EvaluatePassword(p);
            return result.Score;
        }

        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public bool VerifyPassword(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }
    }
}