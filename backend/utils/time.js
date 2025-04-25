const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

// 转为 UTC 的完整日期时间（YYYY-MM-DD HH:mm:ss）
exports.toUTCDateTime = (input = new Date()) => {
    return dayjs(input).utc().format("YYYY-MM-DD HH:mm:ss");
};

// 转为 UTC 的时间字符串（HH:mm:ss）——用于 time
exports.toUTCTimeOnly = (input) => {
    const fakeDateTime = `2000-01-01T${input}`;
    return dayjs(fakeDateTime).utc().format("HH:mm:ss");
};
