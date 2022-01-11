
using AbTestTask.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace AbTestTask.DAL
{
    public class UserContext: DbContext
    {
        public DbSet<User> Users { get; set; }

        public UserContext(DbContextOptions<UserContext> options)
            : base(options)
        {
        }
    }
}