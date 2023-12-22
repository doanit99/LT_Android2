using System.ComponentModel.DataAnnotations.Schema;

namespace AppApiReactNative.Models
{
    public class Product
    {
        public int Id { get; set; }
        public int Category_Id { get; set; }
        public string Name { get; set; }
        [Column(TypeName = "nvarchar(1000)")]
        public double Price { get; set; }
        public int Qty { get; set; }
        public string? Image { get; set; }
        [Column(TypeName = "text")]
        public string Detail { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int? Status { get; set; }
    }
}
