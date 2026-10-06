import { createClient } from "@/utils/supabase/client";

export async function recordLogin() {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User belum login");
  }

  const { data: access, error: accessError } = await supabase
    .from("d3_user_access")
    .select("employee_id, app_role")
    .eq("auth_user_id", user.id)
    .single();

  if (accessError || !access) {
    throw new Error("Data user access tidak ditemukan");
  }

  const { data: employee, error: employeeError } = await supabase
    .from("d3_employee")
    .select("full_name")
    .eq("id", access.employee_id)
    .single();

  if (employeeError || !employee) {
    throw new Error("Data employee tidak ditemukan");
  }

  const { data, error } = await supabase
    .from("tracking_login")
    .insert({
      auth_user_id: user.id,
      employee_id: access.employee_id,
      nama: employee.full_name,
      email: user.email ?? "",
      role: access.app_role,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Gagal mencatat login: ${error.message}`);
  }

  return data;
}

export async function recordLogout() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from("tracking_login")
    .update({
      timelogout: new Date().toTimeString().slice(0, 8),
    })
    .eq("auth_user_id", user.id)
    .is("timelogout", null);
}