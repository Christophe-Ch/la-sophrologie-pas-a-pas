<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;

class Mail
{
    #[Assert\NotBlank(message: 'Veuillez entrer votre nom.')]
    protected string $name;

    #[Assert\NotBlank(message: 'Veuillez entrer votre adresse email.')]
    #[Assert\Email(message: 'Cette addresse email n\'est pas valide.')]
    protected string $email;

    #[Assert\NotBlank(message: 'Veuillez entrer un sujet.')]
    protected string $subject;

    #[Assert\NotBlank(message: 'Veuillez entrer un message.')]
    protected string $message;

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    /**
     * @return string
     */
    public function getSubject(): string
    {
        return $this->subject;
    }

    /**
     * @param string $subject
     */
    public function setSubject(string $subject): void
    {
        $this->subject = $subject;
    }

    /**
     * @return string
     */
    public function getMessage(): string
    {
        return $this->message;
    }

    /**
     * @param string $message
     */
    public function setMessage(string $message): void
    {
        $this->message = $message;
    }
}
