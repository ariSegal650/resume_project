using LogicServices.Entities;
using Microsoft.EntityFrameworkCore;

namespace LogicServices.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            UsersData=Set<UserDataClass>();
            UsersStatistics=Set<StatisticsInfoClass>();
        }

        public DbSet<UserDataClass> UsersData { get; set; }

        public DbSet<StatisticsInfoClass> UsersStatistics { get; set; }

        internal StatisticsInfoClass Find(int id)
        {
            throw new NotImplementedException();
        }
        internal UserDataClass Find(string email)
        {
            throw new NotImplementedException();
        }
    }
}