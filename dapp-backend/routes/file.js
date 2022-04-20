const express = require("express");
const multer = require("multer");

const upload = multer();
const router = express.Router();

const metamaskUtil = require("@metamask/eth-sig-util");
const ascii85 = require("ascii85");

function normalEncrypt(publicKey, text) {
  const enc = metamaskUtil.encrypt({
    publicKey: publicKey.toString("base64"),
    data: ascii85.encode(text).toString(),
    version: "x25519-xsalsa20-poly1305",
  });

  return enc;
}

router.post("/encrypt2", upload.single("file"), (req, res) => {
  const file = req.file;
  const publicKey = req.body.publicKey;
  const publicKeyBuffer = Buffer.from(publicKey, "base64");
  encrypted = normalEncrypt(publicKeyBuffer, file.buffer);

  res.send({ encrypted: encrypted });
});

module.exports = router;
