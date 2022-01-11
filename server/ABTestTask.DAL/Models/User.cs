using System;

namespace AbTestTask.DAL.Models
{
    public class User: Entity
    {
        public DateTime RegistrationDate { get; set; }
        
        public DateTime LastActivityDate { get; set; }
    }
}