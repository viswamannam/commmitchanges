using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System;

namespace WebScanner.Models.EBTS
{
    [Serializable]
    public partial class Transaction_Detail
    {

        public string Transaction_ID { get; set; }


        public string Transaction_BinaryValue
        {
            get; set; 
        
        }
    }
    public class Person
    {
        //[Required(ErrorMessage = "First name is required")]
        //[Display(Name = "First Name")]
        //[DataType(DataType.Text)]
        ////[StringLength(100)]
        //[StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
        //public string FirstName { get; set; }

        //[Display(Name = "Middle Name")]
        //[DataType(DataType.Text)]
        ////[StringLength(100)]
        //[StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 0)]
        //public string MiddleName { get; set; }

        //[Required(ErrorMessage ="Last name is required")]
        //[Display(Name = "Last Name")]
        //[DataType(DataType.Text)]
        ////[StringLength(100)]
        //[StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
        //public string LastName { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [Display(Name = "Full Name")]
        [DataType(DataType.Text)]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
        public string FullName { get; set; }


        [Required]
        [StringLength(7, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 3)]
        public string IdentifierCode { get; set; }
        //[Range(1, 20)]
    }


    public class PersonViewModel
    {
        public List<Field> Field { get; set; }
    }
    public class Field
    {
        public string FieldList { get; set; }
      
    }


}