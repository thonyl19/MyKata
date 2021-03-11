using Genesis.Gtimes.ADM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tx = MDL.model.tx;
using cls = cDAL.MES.user;
using x = RES.BLL.resources;
using System.Reflection;
using Newtonsoft.Json;
using log = DAL.log;
using s = MDL.Base.State.view.user;
using mdl = MDL.MES.Views.user;

namespace cBLL.MES
{
    public class user
    {
        public static bool check(string account, string cs = "csMES")
        {
            bool r = false;
            try
            {
                var u = cDAL.MES.user.get(no: account);
                if (u != null) r = true;
            }
            catch (Exception ex)
            {
                DAL.log.add(new MDL.Log.Log() { Index = ex.GetType().FullName, Model = $"{MethodBase.GetCurrentMethod().DeclaringType.FullName}:{MethodBase.GetCurrentMethod().Name}", Content = JsonConvert.SerializeObject(ex) });
            }
            return r;
        }
        public static tx get(string sid = null, string no = null)
        {
            tx tx = new tx();
            try
            {
                var model = cls.get(sid: sid, no: no);
                if (model == null)
                {
                    tx.result = MDL.model.txResult.F;
                    tx.message.Add(x.noneData);
                }
                else
                    tx.model = model;
            }
            catch (Exception ex)
            {
                tx.result = MDL.model.txResult.E; tx.error = ex.Message;
                DAL.log.add(new MDL.Log.Log() { Index = ex.GetType().FullName, Model = $"{MethodBase.GetCurrentMethod().DeclaringType.FullName}:{MethodBase.GetCurrentMethod().Name}", Content = JsonConvert.SerializeObject(ex) });
            }
            return tx;
        }
        public static tx load(MDL.Base.State.Pager pager = null, mdl.query conditions = null)
        {
            tx tx = new tx();
            try
            {
                var model = cls.load(ref pager, conditions);
                if (model == null)
                {
                    tx.result = MDL.model.txResult.F;
                    tx.message.Add(x.noneData);
                }
                else
                {
                    tx.model = model;
                    tx.count = model.Count();
                }
            }
            catch (Exception ex)
            {
                tx.result = MDL.model.txResult.E; tx.error = ex.Message;
                log.add(new MDL.Log.Log() { Index = ex.GetType().FullName, Model = $"{MethodBase.GetCurrentMethod().DeclaringType.FullName}:{MethodBase.GetCurrentMethod().Name}", Content = JsonConvert.SerializeObject(ex) });
            }
            return tx;
        }
        public static dynamic state(string id = null, dynamic e = null, string type = "index")
        {
            try
            {
                bool flag = true;   //取值(非新增或修改)

                //對應ID & Entity
                if (string.IsNullOrEmpty(id) & (e == null || string.IsNullOrEmpty(e.id)))
                {
                    //都沒給, 給預設值 => 新增
                    switch (type)
                    {
                        //case "navbar":
                        //    e = new s.navbar();
                        //    break;
                        default:
                            e = new s.index();
                            break;
                    }
                    id = e.id;
                    flag = false;
                }
                else if (string.IsNullOrEmpty(id) & !(e == null || string.IsNullOrEmpty(e.id)))
                {
                    //只給Entity => 修改
                    id = e.id;
                    flag = false;
                }
                else if (!string.IsNullOrEmpty(id) & (e == null || string.IsNullOrEmpty(e.id)))
                {
                    //只給ID => 取值
                }
                else if (!string.IsNullOrEmpty(id) & !(e == null || string.IsNullOrEmpty(e.id)))
                {
                    //都給 => 修改
                    if (id != e.id) e.id = id;
                    flag = false;
                }
                else
                {
                    //例外給預設
                    switch (type)
                    {
                        //case "navbar":
                        //    if (e == null && string.IsNullOrEmpty(e.id)) e = new s.navbar();
                        //    break;
                        default:
                            if (e == null && string.IsNullOrEmpty(e.id)) e = new s.index();
                            break;
                    }
                    if (string.IsNullOrEmpty(id)) id = e.id; else e.id = id;
                    flag = false;
                }

                MDL.Base.State s = null;
                if (flag)
                {
                    //取值
                    s = BLL.state.get(id);
                    if (s == null) s = new MDL.Base.State();
                    switch (type)
                    {
                        //case "navbar":
                        //    if (string.IsNullOrEmpty(s.Json)) s.Json = JsonConvert.SerializeObject(new s.navbar());
                        //    e = JsonConvert.DeserializeObject<s.navbar>(s.Json);
                        //    break;
                        default:
                            if (string.IsNullOrEmpty(s.Json)) s.Json = JsonConvert.SerializeObject(new s.index());
                            e = JsonConvert.DeserializeObject<s.index>(s.Json);
                            break;
                    }
                }
                else
                {
                    //新增或修改
                    tx tx = BLL.state.view(id, JsonConvert.SerializeObject(e));
                    switch (type)
                    {
                        //case "navbar":
                        //    if (tx.result == MDL.model.txResult.S) e = JsonConvert.DeserializeObject<s.navbar>(((MDL.Base.State)tx.model).Json);
                        //    break;
                        default:
                            if (tx.result == MDL.model.txResult.S) e = JsonConvert.DeserializeObject<s.index>(((MDL.Base.State)tx.model).Json);
                            break;
                    }
                }
            }
            catch (Exception ex)
            {
                switch (type)
                {
                    //case "navbar":
                    //    e = new s.navbar();
                    //    break;
                    default:
                        e = new s.index();
                        break;
                }
                log.add(new MDL.Log.Log() { Index = ex.GetType().FullName, Model = $"{MethodBase.GetCurrentMethod().DeclaringType.FullName}:{MethodBase.GetCurrentMethod().Name}", Content = JsonConvert.SerializeObject(ex) });
            }
            return e;
        }
        public static string defaultPassword(string def = "MES123")
        {
            try
            {
                ParameterUtility.ParameterInfo para = new ParameterUtility.ParameterInfo(mes.dbc(), "DefaultPassword", ParameterUtility.ParameterInfo.IndexType.No);
                if (para.IsExist) def = para.PARAMETER_VALUE;
            }
            catch { }
            return def;
        }
        public static tx sync(List<string> user = null)
        {
            tx tx = new tx();
            try
            {
                MDL.Base.State.Pager pager = new MDL.Base.State.Pager() { idx = 0 };
                var model = cDAL.MES.user.load(ref pager, new MDL.MES.Views.user.query() {  noList = user });
                if (model != null && model.Where(m => m != null).Count() > 0)
                {
                    var _form = DAL.hierarchy.get("*", "resources", "account");
                    var _ldap = DAL.hierarchy.get("*", "resources", "ldap");
                    var _mes = DAL.hierarchy.get("*", "resources", "gtimes");
                    if (_ldap == null) _ldap = _form;
                    if (_mes == null) _mes = _form;

                    foreach (var e in model)
                    {
                        if (e.account.ToLower() == "admin" | e.account.ToLower() == "supervisor") continue;
                        var _e = DAL.resources.get(userName: e.account);
                        if (_e == null)
                        {
                            #region 加入

                            BLL.resources.add(new MDL.Base.Resources.register()
                            {
                                userName = e.account,
                                no = e.no,
                                name = e.name,
                                email = e.email,
                                realName = e.name,
                                hierarchyId = string.IsNullOrEmpty(e.authType) ? _form.HierarchyId : (e.authType == "ldap" ? _ldap.HierarchyId : _mes.HierarchyId),
                                lockoutEnabled = !e.isEnabled
                            });

                            #endregion
                        }
                        else
                        {
                            #region 更新

                            _e.resources.LockoutEnabled = !e.isEnabled;
                            _e.index.isLockout = !e.isEnabled;
                            _e.index.HierarchyId = string.IsNullOrEmpty(e.authType) ? _form.HierarchyId : (e.authType == "ldap" ? _ldap.HierarchyId : _mes.HierarchyId);
                            BLL.resources.edit(_e);
                            BLL.resources.resetPassword(new MDL.Base.Resources.resetPassword() { userName = _e.resources.UserName });

                            #endregion
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                tx.result = MDL.model.txResult.E; tx.error = ex.Message;
                DAL.log.add(new MDL.Log.Log() { Index = ex.GetType().FullName, Model = $"{MethodBase.GetCurrentMethod().DeclaringType.FullName}:{MethodBase.GetCurrentMethod().Name}", Content = JsonConvert.SerializeObject(ex) });
            }
            return tx;
        }
        public class group
        {
            public static tx load(MDL.Base.State.Pager pager = null, mdl.query conditions = null)
            {
                tx tx = new tx();
                try
                {
                    var model = cls.group.load(ref pager, conditions);
                    if (model == null)
                    {
                        tx.result = MDL.model.txResult.F;
                        tx.message.Add(x.noneData);
                    }
                    else
                    {
                        tx.model = model;
                        tx.count = model.Count();
                    }
                }
                catch (Exception ex)
                {
                    tx.result = MDL.model.txResult.E; tx.error = ex.Message;
                    log.add(new MDL.Log.Log() { Index = ex.GetType().FullName, Model = $"{MethodBase.GetCurrentMethod().DeclaringType.FullName}:{MethodBase.GetCurrentMethod().Name}", Content = JsonConvert.SerializeObject(ex) });
                }
                return tx;
            }
        }
        public class status
        {
            public static tx load(mdl.query conditions = null)
            {
                tx tx = new tx();
                try
                {
                    var model = cls.status.load(conditions: conditions);
                    if (model == null)
                    {
                        tx.result = MDL.model.txResult.F;
                        tx.message.Add(x.noneData);
                    }
                    else
                    {
                        tx.model = model;
                        tx.count = model.Count();
                    }
                }
                catch (Exception ex)
                {
                    tx.result = MDL.model.txResult.E; tx.error = ex.Message;
                    log.add(new MDL.Log.Log() { Index = ex.GetType().FullName, Model = $"{MethodBase.GetCurrentMethod().DeclaringType.FullName}:{MethodBase.GetCurrentMethod().Name}", Content = JsonConvert.SerializeObject(ex) });
                }
                return tx;
            }
        }
    }
}
