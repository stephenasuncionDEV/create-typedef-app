import type { NextPage } from "next";
import { Flex, Center, Heading, Text, VStack } from "@chakra-ui/react";
import Meta from "@/components/Meta";

const config = {
  services: "Consulting and technical support services",
  state: "Vancouver",
};

const Terms: NextPage = () => {
  return (
    <Center>
      <Meta title="Terms of Service" />
      <Flex flexDir="column" maxW="860px" w="full" p="2em">
        <Heading as="h1" fontSize="28pt" fontWeight="500">
          Terms of Service
        </Heading>
        <Text>Updated December 6, 2022</Text>
        <Text variant="subtle">
          Agreement between User and {process.env.APP_NAME}
        </Text>
        <VStack spacing="2em" mt="2em">
          <section id="introduction">
            <Text mt=".5em">
              These terms of service (the &quot;Terms&quot;) govern your access
              to and use of {process.env.APP_NAME}&apos;s website and services
              (the &quot;Services&quot;). By accessing or using the Services,
              you agree to be bound by these Terms. If you do not agree to these
              Terms, you may not access or use the Services.
            </Text>
          </section>
          <section id="scope-of-services">
            <Heading
              as="h1"
              fontSize="14pt"
              fontWeight="500"
              textDecor="underline"
            >
              SCOPE OF SERVICES
            </Heading>
            <Text mt=".5em" ml="1em">
              {process.env.APP_NAME} provides the following services:
              {config.services}. {process.env.APP_NAME} reserves the right to
              change, suspend, or discontinue any aspect of the Services at any
              time.
            </Text>
          </section>
          <section id="user-accounts">
            <Heading
              as="h1"
              fontSize="14pt"
              fontWeight="500"
              textDecor="underline"
            >
              USER ACCOUNTS
            </Heading>
            <Text mt=".5em" ml="1em">
              In order to use certain features of the Services, you may need to
              create an account. You are responsible for keeping your account
              login information confidential and are fully responsible for all
              activities that occur under your account. You agree to immediately
              notify {process.env.APP_NAME} of any unauthorized use of your
              account or any other breach of security.
            </Text>
          </section>
          <section id="user-conduct">
            <Heading
              as="h1"
              fontSize="14pt"
              fontWeight="500"
              textDecor="underline"
            >
              USER CONDUCT
            </Heading>
            <Text mt=".5em" ml="1em">
              You agree to use the Services only for lawful purposes and in
              accordance with these Terms. You agree not to use the Services:
            </Text>
            <ul style={{ marginLeft: "3em", marginTop: "1.5em" }}>
              <li>
                In any way that violates any applicable federal, state, local,
                or international law or regulation.
              </li>
              <li>
                To transmit, or procure the sending of, any advertising or
                promotional material, including any &quot;junk mail,&quot;
                &quot;chain letter,&quot; &quot;spam,&quot; or any other similar
                solicitation.
              </li>
              <li>
                To impersonate or attempt to impersonate {process.env.APP_NAME},
                an
                {process.env.APP_NAME} employee, another user, or any other
                person or entity.
              </li>
            </ul>
          </section>
          <section id="intellectual-property">
            <Heading
              as="h1"
              fontSize="14pt"
              fontWeight="500"
              textDecor="underline"
            >
              INTELLECTUAL PROPERTY
            </Heading>
            <Text mt=".5em" ml="1em">
              The Services and all content and materials included on the
              Services, including, but not limited to, text, graphics, logos,
              images, and software, are the property of {process.env.APP_NAME}{" "}
              or its licensors and are protected by United States and
              international copyright and trademark laws. You may not use,
              reproduce, distribute, modify, or create derivative works of the
              Services or any content or materials on the Services without{" "}
              {process.env.APP_NAME}&apos;s express written consent.
            </Text>
          </section>
          <section id="disclaimer-warranties">
            <Heading
              as="h1"
              fontSize="14pt"
              fontWeight="500"
              textDecor="underline"
            >
              DISCLAIMER OF WARRANTIES
            </Heading>
            <Text mt=".5em" ml="1em">
              THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS
              AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
              IMPLIED. {process.env.APP_NAME} DISCLAIMS ALL WARRANTIES,
              INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT. {process.env.APP_NAME} DOES NOT WARRANT THAT THE
              SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, AND{" "}
              {process.env.APP_NAME} WILL NOT BE LIABLE FOR ANY INTERRUPTION,
              DELAY IN OPERATION OR TRANSMISSION, COMPUTER VIRUS, OR OTHER
              DAMAGE CAUSED BY THE USE OF THE SERVICES.
            </Text>
          </section>
          <section id="limitation-liability">
            <Heading
              as="h1"
              fontSize="14pt"
              fontWeight="500"
              textDecor="underline"
            >
              LIMITATION OF LIABILITY
            </Heading>
            <Text mt=".5em" ml="1em">
              IN NO EVENT WILL {process.env.APP_NAME} BE LIABLE FOR ANY
              INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR
              PUNITIVE DAMAGES, INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR LOSS
              OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, EVEN
              IF
              {process.env.APP_NAME} HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
              DAMAGES, RESULTING FROM THE USE OR INABILITY TO USE THE SERVICES.
            </Text>
          </section>
          <section id="indemnification">
            <Heading
              as="h1"
              fontSize="14pt"
              fontWeight="500"
              textDecor="underline"
            >
              INDEMNIFICATION
            </Heading>
            <Text mt=".5em" ml="1em">
              You agree to indemnify, defend, and hold harmless{" "}
              {process.env.APP_NAME}
              and its affiliates, officers, agents, and employees from and
              against any and all claims, liabilities, damages, losses, and
              expenses, including, without limitation, reasonable
              attorney&apos;s fees and costs, arising out of or in any way
              connected with your access to or use of the Services, your
              violation of these Terms, or your violation of any rights of
              another.
            </Text>
          </section>
          <section id="miscellaneous">
            <Heading
              as="h1"
              fontSize="14pt"
              fontWeight="500"
              textDecor="underline"
            >
              MISCELLANEOUS
            </Heading>
            <Text mt=".5em" ml="1em">
              These Terms constitute the entire agreement between you and
              {process.env.APP_NAME} regarding the use of the Services. If any
              provision of these Terms is found to be invalid or unenforceable,
              that provision will be enforced to the maximum extent possible,
              and the remaining provisions will remain in full force and effect.
              {process.env.APP_NAME} may assign these Terms, in whole or in
              part, at any time without notice to you. You may not assign these
              Terms or transfer any rights to use the Services without{" "}
              {process.env.APP_NAME}&apos;s prior written consent.{" "}
              {process.env.APP_NAME}
              &apos;s failure to enforce any right or provision of these Terms
              will not be deemed a waiver of such right or provision. By using
              the Services, you acknowledge that you have read these Terms and
              understand and agree to be bound by them.
            </Text>
          </section>
        </VStack>
      </Flex>
    </Center>
  );
};

export default Terms;
