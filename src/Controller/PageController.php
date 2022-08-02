<?php

namespace App\Controller;

use App\Entity\Email;
use App\EmailType;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Annotation\Route;

class PageController extends AbstractController
{
    #[Route('/', name: 'app_index')]
    public function index(): Response
    {
        return $this->render('index.html.twig');
    }

    #[Route('/sophrologie', name: 'app_sophrologie')]
    public function sophrologie(): Response
    {
        return $this->render('sophrologie.html.twig');
    }

    #[Route('/seances', name: 'app_seances')]
    public function seances(): Response
    {
        return $this->render('seances.html.twig');
    }

    #[Route('/qui-suis-je', name: 'app_qui_suis_je')]
    public function quiSuisJe(): Response
    {
        return $this->render('qui_suis_je.html.twig');
    }

    #[Route('/tarifs', name: 'app_tarifs')]
    public function tarifs(): Response
    {
        return $this->render('tarifs.html.twig');
    }

    #[Route('/contact', name: 'app_contact', methods: ['GET', 'POST'])]
    public function contact(Request $request, MailerInterface $mailer): Response
    {
        $email = new Email();
        $form = $this->createForm(EmailType::class, $email);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid())
        {
            $message = (new TemplatedEmail())
                ->from($email->getEmail())
                ->to("chris.chich@hotmail.fr")
                ->subject($email->getSubject())
                ->htmlTemplate('email.html.twig')
                ->context([
                    'message' => $email
                ]);


                $mailer->send($message);
        }

        return $this->renderForm('contact.html.twig', [
            'form' => $form,
        ]);
    }

    #[Route('/mentions-legales', name: 'app_mentions_legales')]
    public function mentionsLegales(): Response
    {
        return $this->render('mentions_legales.html.twig');
    }
}
