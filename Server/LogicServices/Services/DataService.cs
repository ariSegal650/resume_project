using LogicServices.Data;
using LogicServices.Dto;
using LogicServices.Entities;
using Microsoft.EntityFrameworkCore;

namespace LogicServices.Services
{
    public class DataService
    {
        private DataContext _Context { get; }

        public DataService(DataContext context)
        {
            _Context = context;
        }

        public async Task<UserDataDto?> GetUserData(string email, string? token)
        {

        
            var user = await _Context.UsersData.FindAsync(email);
            var Message = "";

            if (user is null)
            {
                user =await CreateUserAsync(email);
                Message = "new user";
            }

            if (user is null)
            {
                return null;
            }
          
            // UserDataDto userConvert1 = _mapper.Map<UserDataDto>(user);
            UserDataDto userConvert = new UserDataDto
            {
                page1 = user.page1,
                page2 = user.page2,
                page3 = user.page3,
                url = user.url,
                message = Message,
                email = user.email,
                color = "basic",
                Token = token
            };
            return userConvert;
        }
        public async Task<UserDataClass?> CreateUserAsync(string _email)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();
            var result = new char[6];
         
            for (int i = 0; i < result.Length; i++)
            {
                result[i] = chars[random.Next(chars.Length)];
            }

            var emailOu = _email.Split('.') as Array;
            var email1 = "";
            foreach (var s in emailOu)
            {
                email1 += s;
            }
            UserDataClass user = new UserDataClass
            {
                email = _email,
                url = email1 + new string(result),
                page1="",
                page2="",
                page3="",
                
            };
            try
            {
                _Context.UsersData.Add(user);
                await _Context.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                System.Console.WriteLine(ex);
                return null;
            }

        }

        public async Task<bool> saveInfo(reciveDataDto userD, string Email)
        {
            // this.identification = new IdentificationController(this._Context, this._mapper);

            var user = await _Context.UsersData.FindAsync(Email);
            if (user == null) { return false; }

            try
            {
                user.page1 = userD.page1 ?? "";
                user.page2 = userD.page2 ?? "";
                user.page3 = userD.page3 ?? "";
                _Context.Update(user);
                await _Context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                System.Console.WriteLine(ex);
                return false;
            }

        }

        public async Task<UserDataDto?> GetResume(string url)
        {
            var user = await _Context.UsersData.FirstOrDefaultAsync(u => u.url == url);
            if (user == null) { return null; }

            UserDataDto userConvert = new UserDataDto
            {
                page1 = user.page1,
                page2 = user.page2,
                page3 = user.page3,
                url = "",
                message = "",
                email = "",
                color = user.color
            };
            return userConvert;
        }
    }
}
