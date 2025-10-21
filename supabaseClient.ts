import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ucxtwxlyeihxijmkrabq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjeHR3eGx5ZWloeGlqbWtyYWJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5NDI5ODcsImV4cCI6MjA3NjUxODk4N30.hJBmYAhre4ODSCHhMlET9rjIpA_9Gbw4EVDb4WBlDms'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
