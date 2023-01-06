import config from "../../config/index.js";
import Admin from "../../model/admin/model.js";
import logger from "../../config/logger.js";

async function createAdmin() {
  const adminCredentials = config.admin;
  try {
    const exist = await Admin.findOne({ moodleId: adminCredentials.id });
    if (exist) {
      logger.info("Admin already exist");
      return;
    }
    logger.debug(`Creating Admin with email ${adminCredentials.email}`);
    let admin = new Admin();
    admin.moodleId = adminCredentials.id;
    admin.password = admin.generate_hash(adminCredentials.password);
    admin.role = "admin";
    admin.email = adminCredentials.email;
    admin.first_name = adminCredentials.firstName;

    await admin.save();
    logger.info("Admin created.");
  } catch (error) {
    logger.error("Error while creating admin");
    logger.error(error);
  }
}

createAdmin();
