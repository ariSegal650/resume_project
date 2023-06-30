using LogicServices.Data;
using LogicServices.Dto;
using Microsoft.EntityFrameworkCore;

namespace LogicServices.Services
{
    public class AdminService
    {
        private DataContext _Context { get; }
        public AdminService(DataContext context)
        {
            _Context = context;
        }

        public async Task<AllStatistics?> getStatistics()
        {

            AllStatistics a = new AllStatistics();
            try
            {
                a.users = _Context.UsersStatistics.Count();
                a.usersRegistered =await _Context.UsersData.CountAsync();
                a.downloads =await _Context.UsersStatistics.CountAsync(d => d.download == true);

                foreach (var user in _Context.UsersStatistics)
                {
                    var date = user.loginDate.Month;
                    a.monthDownloads[date]++;
                    a.monthUsers[date]++;
                }

            }
            catch (System.Exception)
            {
                return null;
                throw;
            }
            return a;
        }
    }
}
