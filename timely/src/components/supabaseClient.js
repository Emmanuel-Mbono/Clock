
import { createClient } from "@supabase/supabase-js";

const supabaseUrl= "https://bnmpwfcszlyxzzbtmaed.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubXB3ZmNzemx5eHp6YnRtYWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNjQyNDIsImV4cCI6MjA2Mzg0MDI0Mn0.ltUjvUc-kjYmMeOsa3hwlXAHxIiIk65VIdm1h4fyz_w"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
        