
using LogicServices.Data;
using LogicServices.Entities;

namespace LogicServices.Services
{
    public class StatisticsService
    {
        private DataContext _Context { get; }

        public StatisticsService(DataContext context)
        {
            _Context = context;
        }
        public async Task<string?> CreateUser()
        {
            StatisticsInfoClass a = new StatisticsInfoClass();

            string USerID = a.ToString();

            try
            {
                _Context.UsersStatistics.Add(a);
                await _Context.SaveChangesAsync();

                return USerID;
            }
            catch (System.Exception)
            {
                return null;
            }
        }
        public async Task<bool> AddClickEvent(string UserId)
        {
            var User = _Context.UsersStatistics.FirstOrDefault(i => i.id == Guid.Parse(UserId));
            if (User != null)
            {
                User.clicks += 1;
                _Context.UsersStatistics.Update(User);
                await _Context.SaveChangesAsync();
                return true;
            }
            else { return false; }

        }

        public async Task<bool> AddCity(Guid UserId, string City)
        {
            var User = _Context.UsersStatistics.First(i => i.id == UserId);
            if (User != null)
            {
                User.city = City;
                _Context.UsersStatistics.Update(User);
                await _Context.SaveChangesAsync();
                return true;
            }
            else { return false; }
        }
        public async Task<bool> AddDownload(Guid UserId)
        {
            var User = _Context.UsersStatistics.First(i => i.id == UserId);
            if (User != null)
            {
                User.download = true;
                _Context.UsersStatistics.Update(User);
                await _Context.SaveChangesAsync();
                return true;
            }
            else { return false; }
        }
    }
}
