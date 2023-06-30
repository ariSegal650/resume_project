
using System.ComponentModel.DataAnnotations;

namespace LogicServices.Entities
{
    public class StatisticsInfoClass
    {
        [Key]
        public virtual Guid id { get; set; } = Guid.NewGuid();
        public virtual DateTime loginDate { get; set; } = DateTime.UtcNow;

        public int? clicks { get; set; } =0;

        public string? city { get; set; } = string.Empty;

        public bool? download { get; set; }=false;

        public override string ToString()
        {
            return id.ToString();
        }

    }
    
   
 

}