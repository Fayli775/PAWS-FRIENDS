const bcrypt = require("bcrypt");

const users = [
  {
    email: "alice@example.com",
    passwd: "alice124",
    bio: "Loves cats and long walks.",
    region: "North Shore",
    nick_name: "AliceCat",
    status: 0,
    logo: "https://example.com/avatar/alice.jpg",
    phone_number: "0211234567",
    emergency_contact: "0219876543",
  },
  {
    email: "bob@example.com",
    passwd: "bob456",
    bio: "Experienced dog sitter.",
    region: "West Auckland",
    nick_name: "BobWoof",
    status: 0,
    logo: "https://example.com/avatar/bob.jpg",
    phone_number: "0227654321",
    emergency_contact: "0214567890",
  },
  {
    email: "carol@example.com",
    passwd: "carol789",
    bio: "Pet lover with a big heart.",
    region: "Central Auckland",
    nick_name: "CarolPaws",
    status: 0,
    logo: "https://example.com/avatar/carol.jpg",
    phone_number: "0201112222",
    emergency_contact: "0273334444",
  },
  {
    email: "dave@example.com",
    passwd: "dave321",
    bio: "Professional pet trainer.",
    region: "East Auckland",
    nick_name: "DaveTrain",
    status: 0,
    logo: "https://example.com/avatar/dave.jpg",
    phone_number: "0275556666",
    emergency_contact: "0208889999",
  },
];

async function encryptPasswords() {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    // 使用 bcrypt 加密密码
    const hashedPassword = await bcrypt.hash(user.passwd, 10);
    // 将加密后的密码替换
    user.passwd = hashedPassword;

    console.log(`User ${user.email}: Password has been hashed.`);
  }

  // 打印更新后的数据，以便你可以将其添加到你的 seed.sql 文件中
  console.log("\nUpdated Users Data:\n");
  users.forEach((user) => {
    console.log(
      `(${user.email}, '${user.passwd}', '${user.bio}', '${user.region}', '${user.nick_name}', ${user.status}, '${user.logo}', '${user.phone_number}', '${user.emergency_contact}')`
    );
  });
}

encryptPasswords();
