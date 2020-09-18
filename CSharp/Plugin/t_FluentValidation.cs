using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using CSharp.Linq;
using FluentValidation;
using FluentValidation.TestHelper;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CSharp.Plugin {
    [TestClass]
    public class t_FluentValidation {
        private PersonValidator validator;

        /// <summary>
        /// 初始化設定
        /// </summary>
        [TestInitialize]
        public void Setup () {
            validator = new PersonValidator ();
        }

        /// <summary>
        /// https://docs.fluentvalidation.net/en/latest/testing.html
        /// </summary>
        [TestMethod]
        public void t_第一個基本測例() {
            var model_1 = new Person { Name = "Jeremy" };
            var model_2 = new Person { Name = null };
            /// result_1.IsValid => true
            var result_1 = validator.TestValidate (model_1);
            /// result_2.IsValid => false
            var result_2 = validator.TestValidate (model_2);

            result_1.ShouldNotHaveValidationErrorFor (person => person.Name);

            //result_2.ShouldNotHaveValidationErrorFor (person => person.Name);
            result_2
                .ShouldHaveValidationErrorFor (person => person.Name)
                .WithErrorMessage ("'Name' must not be empty.")
                .WithSeverity (Severity.Error)
                .WithErrorCode ("NotNullValidator");
        }

        [TestMethod]
        public void t_C01 () {
            var model_1 = new Person { Name = null };
            var result_1 = validator.Validate (model_1);
            if (!result_1.IsValid) {
                foreach (var failure in result_1.Errors) {
                    Console.WriteLine ("Property " + failure.PropertyName + " failed validation. Error was: " + failure.ErrorMessage);
                }
            }
            /// 所有的錯誤訊息組成一個字串
            string allMessages = result_1.ToString ("~");

            /// 檢核如果有錯,直接丟 Execption
            validator.ValidateAndThrow (model_1);
        }

        /// <summary>
        /// https://docs.fluentvalidation.net/en/latest/start.html
        /// </summary>
        [TestMethod]
        public void t_規則集結合() {
            var model_1 = new Person { Name = null };
            var result_1 = validator.Validate (model_1, options => {
                options.ThrowOnFailures ();
                options.IncludeRuleSets ("MyRuleSets");
                options.IncludeProperties (x => x.Name);
            });
        }

        /// <summary>
        /// https://docs.fluentvalidation.net/en/latest/start.html
        /// </summary>
        [TestMethod]
        public void t_複雜特性() {
            var model_1 = new Phone {
                PhoneNumber= null ,
                Person = new Person{ Name = null}
            };
            var result_1 = new PhoneValidator().Validate (model_1);
        }
 
        
    }



    public enum PersonValidator_flag
    {
        DependentRules,
        All,   
    }
    public class PersonValidator : AbstractValidator<Person> {
        public PersonValidator () {
            RuleFor (person => person.Name).NotNull ();
        }

    }
    public class PersonValidator_DependentRules : AbstractValidator<Person> {
        public PersonValidator_DependentRules () {
            RuleFor (person => person.Name)
            .NotNull ()
            //相依於前一個檢查條件,成功才會往下執行到這一條 
            .DependentRules(() =>
            {
                RuleFor(x => x.Name).NotNull();
            });
        }
    }

 




    public class PhoneValidator : AbstractValidator<Phone> {
        public PhoneValidator() {
            RuleFor (Phone => Phone.PhoneNumber).NotNull ();
            RuleFor(Phone => Phone.Person).SetValidator(new PersonValidator());
        }


    }
}