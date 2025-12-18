import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../lib/mongodb';
import User from '../lib/models/User';

async function createAdmin() {
  try {
    await connectToDatabase();

    const email = 'admin@amacatherapeutics.com';
    const password = 'Admin@123'; // Change this password!
    const name = 'Admin User';

    // Check if admin already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin user created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdmin();