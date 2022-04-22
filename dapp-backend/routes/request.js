const express = require("express");

const router = express.Router();

const metamaskUtil = require("@metamask/eth-sig-util");

function encrypt(publicKey, text) {
  const enc = metamaskUtil.encrypt({
    publicKey: publicKey,
    data: text,
    version: "x25519-xsalsa20-poly1305",
  });

  return enc;
}

router.post("/encrypt", (req, res) => {
  const data = req.body.request;
  const publicKey = req.body.publicKey;

  console.log(publicKey);
  console.log(data);

  const encrypted = encrypt(publicKey, data);

  res.send({ encrypted: encrypted });
});

module.exports = router;
