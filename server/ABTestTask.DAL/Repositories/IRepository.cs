using System.Linq;
using System.Threading.Tasks;
using AbTestTask.DAL.Models;

namespace AbTestTask.DAL.Repositories
{
    public interface IRepository
    {
        public IQueryable<T> GetAllAsNoTracking<T>() where T : Entity;
        public Task<int> AddAsync<T>(T item) where T : Entity;
        public Task<T> GetByIdAsync<T>(int id) where T : Entity;
        public Task UpdateAsync<T>(T item) where T : Entity;
        public Task DeleteAsync<T>(int id) where T : Entity;
        public Task<bool> IsItemWithIdExistsAsync<T>(int id) where T : Entity;
    }
    
}