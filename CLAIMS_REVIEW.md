# Claims Review Sign-Off

As part of the pre-launch audit, I have reviewed every string of copy on the site against the following strict constraints:
- **No medical claims:** Cannot diagnose, treat, cure, or prevent any disease.
- **No fake social proof:** Cannot use fake reviews, fake statistics, or fake urgency.

## Findings & Resolutions

1. **"Acupressure Mat" / Tension Recovery**
   - *Original Risk:* Implying acupressure cures back pain or insomnia.
   - *Current Implementation:* We frame the product strictly as a "physical intervention for digital fatigue" and an "evening reset". We focus on the *sensation* (warmth, sharp physical reset) rather than a *therapeutic outcome*.
   - *Status:* **APPROVED**

2. **Social Proof Module (`SocialProof`)**
   - *Original Risk:* Dropshipping sites often mock "4.9 stars based on 10,000 reviews" before having a single customer.
   - *Current Implementation:* The component checks `reviews.length`. If there are 0 reviews, it degrades gracefully to a founder note and physical guarantee, rendering zero stars and removing `aggregateRating` from the JSON-LD schema.
   - *Status:* **APPROVED**

3. **"30-Day Physical Guarantee"**
   - *Original Risk:* Guarantees can sound like medical promises.
   - *Current Implementation:* We guarantee the user will "feel a physical shift" and offer a no-questions-asked return policy. It's a satisfaction guarantee, not a health guarantee.
   - *Status:* **APPROVED**

## Final Verdict
The copy is fully compliant. No therapeutic claims are made, and no artificial urgency/scarcity patterns exist.

4. **Operational Facts**
   - *Original Risk:* Using fake addresses, emails, or founder stories to build false trust.
   - *Current Implementation:* All operational facts (support email, address, response times) are centralized in `lib/config/store-details.ts`. If they are unset, the UI degrades gracefully. We do not print raw placeholder tokens.
   - *Status:* **APPROVED**

**Awaiting Founder Sign-Off:** [ ]
