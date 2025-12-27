import supabase from '../supabase.js';

export const findUserByName = async (name) => {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('name', name)
    .single();

  if (error) {
    throw new Error(`User not found: ${error.message}`);
  }

  return data;
};

export const createUser = async (name, passwordHash) => {
  const { data, error } = await supabase
    .from('user')
    .insert([{ name, password: passwordHash }])
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }

  return data;
};