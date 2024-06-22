import { userSchema } from "../schema/user";
import bcrypt from "bcrypt";

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes

userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

userSchema.virtual("is_locked").get(function () {
  return !!(this.locked_until && this.locked_until > new Date(Date.now()));
});

userSchema.methods.loginAttempts = async function (): Promise<void> {
  if (this.locked_until && this.locked_until < new Date(Date.now())) {
    await this.updateOne({
      $set: { login_attempts: 1 },
      $unset: { locked_until: 1 },
    }).exec();
  } else {
    const updates: {
      $inc: { login_attempts: number };
      $set?: { locked_until: number };
    } = { $inc: { login_attempts: 1 } };
    if (this.login_attempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.is_locked) {
      updates.$set = { locked_until: Date.now() + LOCK_TIME };
    }
    await this.updateOne(updates).exec();
  }
};

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const compared = await bcrypt.compare(candidatePassword, this.password);

  if (!compared) {
    await this.loginAttempts();
    return false;
  }

  return true;
};

export default userSchema;
