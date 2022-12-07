import { Flex, Center, Heading, Text, VStack } from "@chakra-ui/react";
import Meta from "@/components/Meta";

const config = {
  businessName: "Acme Corporation",
  contactInformation: "mywebsite@example.com",
};

export default function Privacy() {
  return (
    <Center>
      <Meta title="Privacy Policy" />
      <Flex flexDir="column" maxW="860px" w="full" p="2em">
        <Heading as="h1" fontSize="28pt" fontWeight="500">
          Privacy Policy
        </Heading>
        <Text>Updated December 6, 2022</Text>
        <Text variant="subtle">User and {config.businessName}</Text>
        <VStack spacing="2em" mt="2em">
          <section id="introduction">
            <Text mt=".5em">
              At {config.businessName}, we take the privacy of our users
              seriously. This privacy policy explains how we collect, use, and
              protect the personal information of users of our website (the
              &quot;Website&quot;). By using the Website, you consent to the
              collection, use, and sharing of your personal information as
              described in this policy.
            </Text>
          </section>
          <section id="scope-of-services">
            <Heading
              as="h1"
              fontSize="14pt"
              fontWeight="500"
              textDecor="underline"
            >
              INFORMATION COLLECTION
            </Heading>
            <Text mt=".5em">
              We collect personal information from users of the Website when it
              is voluntarily submitted to us. This may include information such
              as names, addresses, and email addresses. We also collect
              information about users&apos; interactions with the Website, such
              as the pages visited and products purchased.
            </Text>
          </section>
          <section id="user-accounts">
            <Heading
              as="h1"
              fontSize="14pt"
              fontWeight="500"
              textDecor="underline"
            >
              USE OF COLLECTED INFORMATION
            </Heading>
            <Text mt=".5em">
              The personal information we collect is used to improve the Website
              and to personalize users&apos; experiences. We may also use the
              collected information to send marketing communications to users.
            </Text>
          </section>
          <section id="user-conduct">
            <Heading
              as="h1"
              fontSize="14pt"
              fontWeight="500"
              textDecor="underline"
            >
              SHARING OF COLLECTED INFORMATION
            </Heading>
            <Text mt=".5em">
              We may share the collected information with third parties who
              assist with the operation of the Website, such as service
              providers who host the Website or process payment transactions. We
              may also be required to share the collected information with law
              enforcement authorities in response to a subpoena.
            </Text>
          </section>
          <section id="intellectual-property">
            <Heading
              as="h1"
              fontSize="14pt"
              fontWeight="500"
              textDecor="underline"
            >
              DATA SECURITY
            </Heading>
            <Text mt=".5em">
              We take reasonable measures to protect the collected information
              from unauthorized access or disclosure. However, we cannot
              guarantee the security of the collected information, and users
              provide their personal information at their own risk.
            </Text>
          </section>
          <section id="disclaimer-warranties">
            <Heading
              as="h1"
              fontSize="14pt"
              fontWeight="500"
              textDecor="underline"
            >
              DATA RETENTION
            </Heading>
            <Text mt=".5em">
              We will retain the collected information for as long as necessary
              to fulfill the purposes for which it was collected, or as required
              by law.
            </Text>
          </section>
          <section id="limitation-liability">
            <Heading
              as="h1"
              fontSize="14pt"
              fontWeight="500"
              textDecor="underline"
            >
              USER RIGHTS
            </Heading>
            <Text mt=".5em">
              Users have the right to access, correct, or delete their personal
              information at any time. To exercise these rights, please contact
              us at {config.contactInformation}.
            </Text>
          </section>
          <section id="indemnification">
            <Heading
              as="h1"
              fontSize="14pt"
              fontWeight="500"
              textDecor="underline"
            >
              CHANGES TO THE PRIVACY POLICY
            </Heading>
            <Text mt=".5em">
              We may update this privacy policy from time to time, and will post
              any changes on this page. We encourage users to review the privacy
              policy regularly for any updates or changes. If we make material
              changes to the policy, we will notify users through the Website or
              by email.
            </Text>
          </section>
          <section id="law-and-resolution">
            <Heading
              as="h1"
              fontSize="14pt"
              fontWeight="500"
              textDecor="underline"
            >
              CONTACT INFORMATION
            </Heading>
            <Text mt=".5em">
              If you have any questions or concerns about this privacy policy,
              please contact us at {config.contactInformation}.
            </Text>
          </section>
        </VStack>
      </Flex>
    </Center>
  );
}
