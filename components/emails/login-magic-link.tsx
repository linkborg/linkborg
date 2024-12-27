import React from 'react';
import { Html, Head, Body, Container, Heading, Text, Button, Link, Hr } from '@react-email/components';
import { CSSProperties } from 'react';

interface LoginMagicLinkProps {
  toEmail: string;
  actionUrl: string;
  timeString: string;
}

const LoginMagicLink = ({ toEmail, actionUrl, timeString }: LoginMagicLinkProps) => {
  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <div style={styles.gutter}></div>
        <Container style={styles.wrap}>
          <div style={styles.header}>
            <Heading style={styles.heading}>LinkBorg</Heading>
          </div>
          <Hr style={styles.hr as CSSProperties} />
          <Text style={styles.content as CSSProperties}>
            Sign in as {toEmail}?
          </Text>
          <Button href={actionUrl} style={styles.button}>
            Click here to login
          </Button>
          <Text style={styles.content as CSSProperties}>
            If you did not request this email you can safely ignore it.
          </Text>
        </Container>
        <div style={styles.footer as CSSProperties}>
          <p>
            &copy; <Link href="https://linkb.org" style={styles.footerLink}>LinkBorg</Link> · Made with ❤️ in 🇮🇳
          </p>
        </div>
        <div style={styles.timestamp as CSSProperties}>
          {timeString}
        </div>
      </Body>
    </Html>
  );
};

const styles = {
  body: {
    backgroundColor: '#F0F1F3',
    fontFamily: "'Helvetica Neue', 'Segoe UI', Helvetica, sans-serif",
    fontSize: '15px',
    lineHeight: '26px',
    margin: 0,
    color: '#444',
  },
  gutter: {
    padding: '15px',
  },
  wrap: {
    backgroundColor: '#fff',
    padding: '30px',
    maxWidth: '525px',
    margin: '0 auto',
    borderRadius: '5px',
  },
  header: {
    marginBottom: '20px',
  },
  heading: {
    display: 'inline',
    verticalAlign: 'middle',
    fontSize: '20px',
  },
  hr: {
    border: 'none',
    borderTop: '1px solid #efefef',
    color: '#efefef',
    overflow: 'visible',
    textAlign: 'center',
    height: '1px',
  },
  content: {
    color: '#444',
    padding: '10px',
    paddingLeft: '0',
    textAlign: 'justify',
    textJustify: 'inter-word',
  },
  button: {
    display: 'inline-block',
    color: '#fff !important',
    textDecoration: 'none !important',
    backgroundColor: '#0055d4',
    borderRadius: '3px',
    padding: '10px 20px',
    marginTop: '15px',
    marginBottom: '15px',
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#888',
  },
  footerLink: {
    color: '#888',
  },
  timestamp: {
    textAlign: 'center',
    fontSize: '8px',
    color: '#aaa',
  },
};

export default LoginMagicLink;
