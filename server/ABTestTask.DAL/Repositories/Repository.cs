using System.Linq;
using System.Threading.Tasks;
using AbTestTask.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace AbTestTask.DAL.Repositories
{
    public class Repository: IRepository
    {
        private readonly DbContext _context;
        
        public Repository (UserContext context)
        {
            _context = context;
        }

        public IQueryable<T> GetAllAsNoTracking<T>() where T : Entity
        {
            return _context.Set<T>().AsNoTracking().AsQueryable();
        }

        public async Task<int> AddAsync<T>(T item) where T: Entity
        {
            await _context.Set<T>().AddAsync(item);
            await _context.SaveChangesAsync();
            return item.Id;
        }
        

        public async Task<bool> IsItemWithIdExistsAsync<T>(int id) where T : Entity
        {
            return await _context.Set<T>().AnyAsync(x => x.Id == id);

        }

        public async Task<T> GetByIdAsync<T>(int id) where T: Entity
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task UpdateAsync<T>(T item) where T: Entity
        {
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync<T>(int id) where T: Entity
        {
            var item = await GetByIdAsync<T>(id);
            _context.Entry(item).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
        }
    }
}