import { Admin } from './admin.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { generatePassword } from 'src/utils/randomPasswordGenerator';
import { hash } from 'bcrypt';
import { sendMail } from 'src/utils/sendEmail';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly AdminRepository: Repository<Admin>,
  ) {}

  async GetAll(): Promise<Admin[]> {
    try {
      const Admins = await this.AdminRepository.find();
      return Admins;
    } catch (err) {
      console.error(err);
      throw new Error('failed to get all Admins ' + err.message);
    }
  }

  async GetOne(AdminId: number): Promise<Admin | null> {
    try {
      const Admin = await this.AdminRepository.findOne({
        where: {
          id: AdminId,
        },
      });
      if (!Admin) {
        return null;
      }
      return Admin;
    } catch (err) {
      console.error(err);
      throw new Error('failed to get the Admin ' + err.message);
    }
  }

  async Update(
    AdminId: number,
    newAdmin: CreateAdminDto,
  ): Promise<Admin | null> {
    try {
      const Admin = await this.AdminRepository.findOne({
        where: {
          id: AdminId,
        },
      });
      if (!Admin) {
        return null;
      }
      const savedAdmin = await this.AdminRepository.save(newAdmin);
      return savedAdmin;
    } catch (err) {
      console.error(err);
      throw new Error('failed to update the Admin ' + err.message);
    }
  }

  async Delete(id: number): Promise<Admin | null> {
    try {
      const Admin = await this.AdminRepository.findOne({ where: { id } });
      if (!Admin) return null;
      await this.AdminRepository.remove(Admin);
      return Admin;
    } catch (err) {
      console.error(err);
      throw new Error('failed to delete Admin ' + err.message);
    }
  }

  async Create(newAdmin: CreateAdminDto): Promise<Admin | null> {
    try {
      const oldAdmin = await this.AdminRepository.findOne({
        where: {
          email: newAdmin.email,
        },
      });
      if (oldAdmin) {
        return null;
      }
      const Admin = await this.AdminRepository.create(newAdmin);
      const randomPassword = generatePassword(12);
      Admin.password = await hash(randomPassword, 10);
      console.log(randomPassword);
      console.log(Admin.password);
      const emailText =
        `Dear ${Admin.name},\n\n` +
        `Your Admin account at keyBox.dz has been created successfully. Here are your account details:\n\n` +
        `Username/Email: ${Admin.email}\n` +
        `Password: ${randomPassword}\n\n` +
        `Please use these credentials to log in. Make sure to change your password after the first login for security reasons.\n\n` +
        `Best regards,\n`;
      //   + `${admin.name} (${admin.email})`;

      const emailSubject = 'Your KeyBox.dz Account Has Been Created';
      try {
        await sendMail({
          email: Admin.email,
          text: `${emailText}`,
          subject: emailSubject,
        });
      } catch (err) {
        throw new Error('failed to send account to user' + err.message);
      }
      const savedAdmin = await this.AdminRepository.save(Admin);
      savedAdmin.password = undefined;
      return savedAdmin;
    } catch (err) {
      console.error(err);
      throw new Error('failed to create Admin ' + err.message);
    }
  }
}
