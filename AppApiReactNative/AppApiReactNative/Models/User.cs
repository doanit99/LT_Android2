using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace AppApiReactNative.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int? Roles { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int? Status { get; set; }
    }
}
