using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace AppApiReactNative.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public string Name { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public int? Parent_Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int? Status { get; set; }
    }
}
