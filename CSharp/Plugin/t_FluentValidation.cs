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
 
        

        /// <summary>
        /// https://docs.fluentvalidation.net/en/latest/index.html?highlight=when#example
        /// </summary>
        [TestMethod]
        public void t_When() {
            var model_1 = new Person { 
                Name= null ,
                Age = 10
            };
            //當 Age > 0 , Name 不得為 Null
            var _v8n = new PersonValidator(PersonValidator.Flag.When)
                .Validate (model_1);
            var msg = string.Join("\r\n", _v8n.Errors.Select(e => e.ErrorMessage));
        }

        [TestMethod]
        public void t_AgeThen10() {
            var model_1 = new Person { 
                Age = 9
            };
            var _v8n = new PersonValidator(PersonValidator.Flag.AgeThen10)
                .Validate (model_1);
            var msg = string.Join("\r\n", _v8n.Errors.Select(e => e.ErrorMessage));
        }

        /// <summary>
        /// 測試 WithName 用法
        /// </summary>
        [TestMethod]
        public void t_WithName() {
            var _v8n = new PersonValidator(PersonValidator.Flag.WithName)
                .Validate (new Person());
            var msg = string.Join("\r\n", _v8n.Errors.Select(e => e.ErrorMessage));
        }

        /// <summary>
        /// [Ref]
        /// https://docs.fluentvalidation.net/en/latest/built-in-validators.html
        /// </summary>
        [TestMethod]
        public void t_PlaceHolders() {
            var _v8n = new PersonValidator(PersonValidator.Flag.PlaceHolders)
                .Validate (new Person(){Addres="ABCEFG"});
            var msg = string.Join("\r\n", _v8n.Errors.Select(e => e.ErrorMessage));
        }

        

        /// <summary>
        /// https://stackoverflow.com/questions/56648664/notempty-validation-for-multiple-fields
        /// </summary>
        [TestMethod]
        public void t_RuleForParams() {
            //待研究 
        }
        
    }



    
    public class PersonValidator : AbstractValidator<Person> {
        public enum Flag
        {
            DependentRules,
            All,  
            When,
            /// <summary>
            /// 年紀必須大於10
            /// </summary>
            /// <returns></returns>
            AgeThen10,
            WithName,
            PlaceHolders
        }
        public PersonValidator () {
            RuleFor (person => person.Name).NotNull ();
        }

        public PersonValidator (params Flag[] flags) {
            foreach(var flag in flags){
                switch (flag){
                    case Flag.DependentRules:
                        RuleFor (person => person.Name)
                            .NotNull ()
                            //相依於前一個檢查條件,成功才會往下執行到這一條 
                            .DependentRules(() =>
                            {
                                RuleFor(x => x.Name).NotNull();
                            });
                        break;
                    case Flag.All:
                        Include(new PersonValidator());
                        Include(new PersonValidator
                            (Flag.DependentRules
                            ,Flag.When));
                        break;
                    case Flag.When:
                        RuleFor(x => x.Name).NotNull()
                            .When(x => x.Age > 0)
                            .WithMessage("當 Age > 0 , Name 不得為 Null")
                            ;
                        break;
                    case Flag.AgeThen10:
                        RuleFor(x => x.Age)
                            .GreaterThan(10)
                            .WithMessage("Age 必須大於 0")
                            ;
                        break;
                    case Flag.WithName:
                        /*
                        WithName 有個特別之處,就是它放在最後一個也能生效,
                            但就是不能直接放在 RuleFor 之後 
                        */
                        RuleFor(x => x.Addres)
                            .NotEmpty()
                            .WithMessage("{PropertyName} 不得為空值")
                            .Length(0, 5)
                            .WithMessage("{PropertyName} 長度必須為 0~5")
                            .WithName("[地址]")
                            ;
                        RuleFor(x => x.Age)
                            .NotEmpty()
                            .WithMessage("{PropertyName} 不得為空值")
                            ;
                        break;
                    case Flag.PlaceHolders:
                        RuleFor(x => x.Addres)
                            .Length(0, 5)
                            .WithMessage("{PropertyName} 長度必須為 {MinLength}~{MaxLength} ,當前輸入 - {PropertyValue} 只有 {TotalLength} 字元")
                            .WithName("[地址]")
                            ;
                        break;
                }
            }
        }
    }
    /*
    //不是很好用的做法,己被 PersonValidator.Flag 取代
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
    */

 




    public class PhoneValidator : AbstractValidator<Phone> {
        public PhoneValidator() {
            RuleFor (Phone => Phone.PhoneNumber).NotNull ();
            RuleFor(Phone => Phone.Person).SetValidator(new PersonValidator());
        }


    }
}